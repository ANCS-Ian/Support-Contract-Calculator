// MSP Pricing Benchmark Aggregator JavaScript

// Application data
const appData = {
  "last_updated": "2025-08-11T08:58:00Z",
  "data_sources": {
    "service_leadership": {
      "name": "Service Leadership Inc.",
      "description": "Leading MSP benchmarking organization with 20+ years of data",
      "access_method": "Quarterly subscription ($1,999/year for reports)",
      "key_metrics": ["AISP", "EBITDA", "Revenue Growth", "Gross Margin"],
      "data_format": "Web app with 80+ metrics, quarterly reports",
      "coverage": "Global MSPs across all business models",
      "status": "active",
      "update_frequency": "Quarterly"
    },
    "kaseya": {
      "name": "Kaseya Global MSP Benchmark Survey",
      "description": "Annual survey with 1000+ MSP respondents",
      "access_method": "Free white paper download",
      "key_metrics": ["Revenue Growth", "Pricing Models", "Service Offerings"],
      "data_format": "PDF report with survey data",
      "coverage": "Global (83% Americas, 11% EMEA, 6% APAC)",
      "status": "active",
      "update_frequency": "Annual"
    },
    "trumethods": {
      "name": "TruMethods (Kaseya company)",
      "description": "MSP coaching with benchmarking data",
      "access_method": "Member pricing calculator and coaching",
      "key_metrics": ["AISP", "MRR", "Leverage Ratio", "Reactive Support Level"],
      "data_format": "Calculator tools and member data",
      "coverage": "MSP clients and community members",
      "status": "active",
      "update_frequency": "Ongoing"
    },
    "channel_awards": {
      "name": "Channel Futures MSP 501/500",
      "description": "Annual rankings requiring verified financial data",
      "access_method": "Award submissions and published rankings",
      "key_metrics": ["Revenue", "Growth Rate", "Employee Count"],
      "data_format": "Published rankings and aggregated insights",
      "coverage": "Top-performing MSPs globally",
      "status": "active",
      "update_frequency": "Annual"
    }
  },
  "current_pricing_benchmarks": {
    "per_user_monthly": {
      "low_tier_msps": {"min": 50, "max": 100, "description": "Basic MSPs with minimal overhead"},
      "mid_tier_msps": {"min": 100, "max": 150, "description": "Mid-tier with broader service range"},
      "top_tier_msps": {"min": 125, "max": 250, "description": "Comprehensive, best-in-class MSPs"},
      "industry_average": {"min": 100, "max": 200, "description": "Overall industry benchmark"},
      "service_leadership_aisp": {"min": 100, "max": 250, "description": "AISP model for fully managed services"}
    },
    "per_device_monthly": {
      "workstation": {"min": 30, "max": 100, "description": "Desktop/laptop management"},
      "server": {"min": 120, "max": 300, "description": "Server management and monitoring"},
      "mobile_device": {"min": 45, "max": 75, "description": "Smartphone/tablet management"},
      "network_device": {"min": 75, "max": 150, "description": "Switches, routers, firewalls"}
    },
    "business_size_estimates": {
      "small_business_10_20_users": {"min": 2000, "max": 3000, "description": "Monthly cost for 10-20 employee business"},
      "medium_business_50_users": {"min": 5000, "max": 7000, "description": "Monthly cost for 50 employee business"},
      "large_business_100_users": {"min": 12500, "max": 20000, "description": "Monthly cost for 100+ employee business"}
    }
  },
  "market_trends_2025": {
    "profitability_focus": "91% of MSPs prioritize profitability in 2025",
    "revenue_growth": "64% reported revenue increases in 2024",
    "future_growth_expectation": "67% expect growth over next 3 years",
    "ai_security_threats": "2/3 experienced increase in AI-driven attacks",
    "automation_adoption": "90% view automation as game-changing technology"
  },
  "service_categories": {
    "basic_managed_services": ["Remote monitoring", "Basic support", "Patch management"],
    "comprehensive_managed_services": ["24/7 monitoring", "Help desk", "Security services", "Backup/DR"],
    "premium_services": ["vCIO services", "Strategic consulting", "Compliance management", "Custom solutions"],
    "specialized_services": ["MSSP services", "Cloud migration", "DevOps", "Custom development"]
  }
};

// Chart instance for cleanup
let trendsChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});

function initializeApp() {
    updateTimestamps();
    populatePricingBenchmarks();
    populateDataSources();
    setupCalculator();
    createTrendsChart();
    setupExportFunctions();
}

function updateTimestamps() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const lastUpdated = new Date(appData.last_updated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const currentDateEl = document.getElementById('currentDate');
    const lastUpdatedEl = document.getElementById('lastUpdated');
    
    if (currentDateEl) currentDateEl.textContent = currentDate;
    if (lastUpdatedEl) lastUpdatedEl.textContent = `Last updated: ${lastUpdated}`;
}

function populatePricingBenchmarks() {
    // Populate per-user pricing
    const perUserContainer = document.getElementById('perUserPricing');
    if (perUserContainer) {
        const perUserData = appData.current_pricing_benchmarks.per_user_monthly;
        
        perUserContainer.innerHTML = Object.entries(perUserData).map(([key, data]) => {
            const title = formatTitle(key);
            return `
                <div class="pricing-card">
                    <h4>${title}</h4>
                    <div class="price-range">$${data.min} - $${data.max}</div>
                    <div class="price-description">${data.description}</div>
                </div>
            `;
        }).join('');
    }
    
    // Populate per-device pricing
    const perDeviceContainer = document.getElementById('perDevicePricing');
    if (perDeviceContainer) {
        const perDeviceData = appData.current_pricing_benchmarks.per_device_monthly;
        
        perDeviceContainer.innerHTML = Object.entries(perDeviceData).map(([key, data]) => {
            const title = formatTitle(key);
            return `
                <div class="pricing-card">
                    <h4>${title}</h4>
                    <div class="price-range">$${data.min} - $${data.max}</div>
                    <div class="price-description">${data.description}</div>
                </div>
            `;
        }).join('');
    }
    
    // Populate business size pricing
    const businessSizeContainer = document.getElementById('businessSizePricing');
    if (businessSizeContainer) {
        const businessSizeData = appData.current_pricing_benchmarks.business_size_estimates;
        
        businessSizeContainer.innerHTML = Object.entries(businessSizeData).map(([key, data]) => {
            const title = formatTitle(key);
            return `
                <div class="pricing-card">
                    <h4>${title}</h4>
                    <div class="price-range">$${data.min.toLocaleString()} - $${data.max.toLocaleString()}</div>
                    <div class="price-description">${data.description}</div>
                </div>
            `;
        }).join('');
    }
}

function populateDataSources() {
    const sourcesContainer = document.getElementById('dataSources');
    if (!sourcesContainer) return;
    
    const sourcesData = appData.data_sources;
    
    sourcesContainer.innerHTML = Object.entries(sourcesData).map(([key, source]) => {
        return `
            <div class="source-card">
                <div class="source-header">
                    <h4 class="source-name">${source.name}</h4>
                    <span class="source-status ${source.status}">${source.status}</span>
                </div>
                <div class="source-description">${source.description}</div>
                <div class="source-details">
                    <div><strong>Access:</strong> ${source.access_method}</div>
                    <div><strong>Coverage:</strong> ${source.coverage}</div>
                    <div class="source-frequency">Updates: ${source.update_frequency}</div>
                </div>
            </div>
        `;
    }).join('');
}

function setupCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const userCountInput = document.getElementById('userCount');
    const deviceCountInput = document.getElementById('deviceCount');
    const businessTypeSelect = document.getElementById('businessType');
    const serviceTierSelect = document.getElementById('serviceTier');
    
    // Ensure all elements exist
    if (!calculateBtn || !userCountInput || !deviceCountInput || !businessTypeSelect || !serviceTierSelect) {
        console.error('Calculator elements not found');
        return;
    }
    
    // Set up event listeners with proper error handling
    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        calculatePricing();
    });
    
    // Input event listeners
    userCountInput.addEventListener('input', function() {
        clearTimeout(this.calculateTimeout);
        this.calculateTimeout = setTimeout(calculatePricing, 300);
    });
    
    deviceCountInput.addEventListener('input', function() {
        clearTimeout(this.calculateTimeout);
        this.calculateTimeout = setTimeout(calculatePricing, 300);
    });
    
    // Change event listeners for selects
    businessTypeSelect.addEventListener('change', calculatePricing);
    serviceTierSelect.addEventListener('change', calculatePricing);
    
    // Initial calculation
    setTimeout(calculatePricing, 100);
}

function calculatePricing() {
    try {
        const userCountEl = document.getElementById('userCount');
        const deviceCountEl = document.getElementById('deviceCount');
        const businessTypeEl = document.getElementById('businessType');
        const serviceTierEl = document.getElementById('serviceTier');
        
        if (!userCountEl || !deviceCountEl || !businessTypeEl || !serviceTierEl) {
            console.error('Calculator inputs not found');
            return;
        }
        
        const userCount = parseInt(userCountEl.value) || 0;
        const deviceCount = parseInt(deviceCountEl.value) || 0;
        const businessType = businessTypeEl.value;
        const serviceTier = serviceTierEl.value;
        
        if (userCount <= 0 && deviceCount <= 0) {
            const resultsContainer = document.getElementById('calculatorResults');
            if (resultsContainer) {
                resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--color-text-secondary);">Please enter valid numbers for users or devices</div>';
            }
            return;
        }
        
        // Calculate based on different pricing models
        const perUserPricing = calculatePerUserPricing(userCount, serviceTier);
        const perDevicePricing = calculatePerDevicePricing(deviceCount, serviceTier);
        const businessSizePricing = calculateBusinessSizePricing(businessType, serviceTier);
        
        // Determine the most appropriate pricing model
        const recommendedPricing = determineRecommendedPricing(perUserPricing, perDevicePricing, businessSizePricing, userCount, deviceCount);
        
        displayCalculationResults({
            perUser: perUserPricing,
            perDevice: perDevicePricing,
            businessSize: businessSizePricing,
            recommended: recommendedPricing,
            userCount,
            deviceCount,
            businessType,
            serviceTier
        });
    } catch (error) {
        console.error('Error calculating pricing:', error);
        const resultsContainer = document.getElementById('calculatorResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--color-error);">Error calculating pricing. Please try again.</div>';
        }
    }
}

function calculatePerUserPricing(userCount, serviceTier) {
    let basePrice = 150; // Mid-tier default
    
    switch(serviceTier) {
        case 'basic':
            basePrice = 75;
            break;
        case 'comprehensive':
            basePrice = 150;
            break;
        case 'premium':
            basePrice = 200;
            break;
    }
    
    // Apply volume discounts
    const volumeDiscount = userCount > 100 ? 0.9 : userCount > 50 ? 0.95 : 1;
    const monthlyTotal = userCount * basePrice * volumeDiscount;
    
    return {
        basePrice,
        volumeDiscount: (1 - volumeDiscount) * 100,
        monthlyTotal: Math.round(monthlyTotal)
    };
}

function calculatePerDevicePricing(deviceCount, serviceTier) {
    let workstationPrice = 65;
    let serverPrice = 210;
    
    switch(serviceTier) {
        case 'basic':
            workstationPrice = 40;
            serverPrice = 150;
            break;
        case 'comprehensive':
            workstationPrice = 65;
            serverPrice = 210;
            break;
        case 'premium':
            workstationPrice = 85;
            serverPrice = 275;
            break;
    }
    
    // Assume 85% workstations, 15% servers
    const workstations = Math.round(deviceCount * 0.85);
    const servers = Math.round(deviceCount * 0.15);
    
    const monthlyTotal = (workstations * workstationPrice) + (servers * serverPrice);
    
    return {
        workstationPrice,
        serverPrice,
        workstations,
        servers,
        monthlyTotal: Math.round(monthlyTotal)
    };
}

function calculateBusinessSizePricing(businessType, serviceTier) {
    const businessMultipliers = {
        'small': { base: 2500, multiplier: 1 },
        'medium': { base: 6000, multiplier: 1 },
        'large': { base: 16250, multiplier: 1 }
    };
    
    const serviceTierMultipliers = {
        'basic': 0.7,
        'comprehensive': 1,
        'premium': 1.4
    };
    
    const businessData = businessMultipliers[businessType] || businessMultipliers['medium'];
    const tierMultiplier = serviceTierMultipliers[serviceTier] || 1;
    
    const monthlyTotal = Math.round(businessData.base * tierMultiplier);
    
    return {
        businessType,
        baseEstimate: businessData.base,
        tierMultiplier,
        monthlyTotal
    };
}

function determineRecommendedPricing(perUser, perDevice, businessSize, userCount, deviceCount) {
    // Logic to determine the most appropriate pricing model
    const deviceUserRatio = deviceCount / (userCount || 1);
    
    let recommendedModel = 'per-user';
    let recommendedPrice = perUser.monthlyTotal;
    
    // If device to user ratio is very high, per-device might be better
    if (deviceUserRatio > 2) {
        if (perDevice.monthlyTotal < perUser.monthlyTotal) {
            recommendedModel = 'per-device';
            recommendedPrice = perDevice.monthlyTotal;
        }
    }
    
    // For larger businesses, business size estimates might be more accurate
    if (userCount > 50 && Math.abs(businessSize.monthlyTotal - recommendedPrice) / recommendedPrice < 0.2) {
        recommendedModel = 'business-size';
        recommendedPrice = businessSize.monthlyTotal;
    }
    
    return {
        model: recommendedModel,
        price: recommendedPrice
    };
}

function displayCalculationResults(results) {
    const resultsContainer = document.getElementById('calculatorResults');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = `
        <h4 style="margin-top: 0; color: var(--color-text);">Pricing Estimates</h4>
        
        <div class="result-item">
            <span class="result-label">Per-User Model (${results.userCount} users)</span>
            <span class="result-value">$${results.perUser.monthlyTotal.toLocaleString()}/month</span>
        </div>
        
        <div class="result-item">
            <span class="result-label">Per-Device Model (${results.deviceCount} devices)</span>
            <span class="result-value">$${results.perDevice.monthlyTotal.toLocaleString()}/month</span>
        </div>
        
        <div class="result-item">
            <span class="result-label">Business Size Estimate</span>
            <span class="result-value">$${results.businessSize.monthlyTotal.toLocaleString()}/month</span>
        </div>
        
        <div class="result-total">
            <div class="result-item">
                <span class="result-label"><strong>Recommended (${results.recommended.model})</strong></span>
                <span class="result-value">$${results.recommended.price.toLocaleString()}/month</span>
            </div>
        </div>
        
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--color-border); font-size: var(--font-size-sm); color: var(--color-text-secondary);">
            Annual estimate: $${(results.recommended.price * 12).toLocaleString()}
            ${results.perUser.volumeDiscount > 0 ? `<br>Volume discount applied: ${results.perUser.volumeDiscount}%` : ''}
        </div>
    `;
}

function createTrendsChart() {
    const chartCanvas = document.getElementById('trendsChart');
    if (!chartCanvas) return;
    
    const ctx = chartCanvas.getContext('2d');
    
    // Clean up existing chart
    if (trendsChart) {
        trendsChart.destroy();
    }
    
    const chartData = {
        labels: ['Profitability Focus', 'Revenue Growth', 'Future Expectations', 'AI Threats', 'Automation'],
        datasets: [{
            label: '2025 MSP Trends (%)',
            data: [91, 64, 67, 67, 90],
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
            borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
            borderWidth: 2
        }]
    };
    
    try {
        trendsChart = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating trends chart:', error);
    }
    
    // Populate trends list
    populateTrendsList();
}

function populateTrendsList() {
    const trendsContainer = document.getElementById('trendsList');
    if (!trendsContainer) return;
    
    const trendEntries = [
        { metric: '91%', description: 'MSPs prioritize profitability in 2025' },
        { metric: '64%', description: 'Reported revenue increases in 2024' },
        { metric: '67%', description: 'Expect growth over next 3 years' },
        { metric: '2/3', description: 'Experienced increase in AI-driven attacks' },
        { metric: '90%', description: 'View automation as game-changing technology' }
    ];
    
    trendsContainer.innerHTML = trendEntries.map(trend => `
        <div class="trend-item">
            <div class="trend-metric">${trend.metric}</div>
            <div class="trend-description">${trend.description}</div>
        </div>
    `).join('');
}

function setupExportFunctions() {
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const exportReportBtn = document.getElementById('exportReportBtn');
    const printBtn = document.getElementById('printBtn');
    
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', function() {
            showExportFeedback(this, 'Generating CSV...');
            setTimeout(() => {
                exportToCSV();
                showExportSuccess(this, 'CSV Downloaded');
            }, 1000);
        });
    }
    
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', function() {
            showExportFeedback(this, 'Generating Report...');
            setTimeout(() => {
                generateReportSummary();
                showExportSuccess(this, 'Report Downloaded');
            }, 1000);
        });
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', () => window.print());
    }
}

function showExportFeedback(button, message) {
    const originalText = button.textContent;
    button.textContent = message;
    button.disabled = true;
    button.dataset.originalText = originalText;
}

function showExportSuccess(button, message) {
    button.textContent = message;
    button.style.backgroundColor = 'var(--color-success)';
    setTimeout(() => {
        button.textContent = button.dataset.originalText || 'Export';
        button.disabled = false;
        button.style.backgroundColor = '';
    }, 2000);
}

function exportToCSV() {
    try {
        const csvData = generateCSVData();
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `msp-pricing-benchmarks-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error exporting CSV:', error);
    }
}

function generateCSVData() {
    let csv = 'Category,Item,Min Price,Max Price,Description\n';
    
    // Per-user pricing
    Object.entries(appData.current_pricing_benchmarks.per_user_monthly).forEach(([key, data]) => {
        csv += `Per-User Monthly,"${formatTitle(key)}",${data.min},${data.max},"${data.description}"\n`;
    });
    
    // Per-device pricing
    Object.entries(appData.current_pricing_benchmarks.per_device_monthly).forEach(([key, data]) => {
        csv += `Per-Device Monthly,"${formatTitle(key)}",${data.min},${data.max},"${data.description}"\n`;
    });
    
    // Business size estimates
    Object.entries(appData.current_pricing_benchmarks.business_size_estimates).forEach(([key, data]) => {
        csv += `Business Size,"${formatTitle(key)}",${data.min},${data.max},"${data.description}"\n`;
    });
    
    return csv;
}

function generateReportSummary() {
    try {
        const reportContent = `MSP PRICING BENCHMARK REPORT
Generated: ${new Date().toLocaleDateString()}
Data Last Updated: ${new Date(appData.last_updated).toLocaleDateString()}

INDUSTRY AVERAGES:
- Per-User Monthly: $100-$200
- Market Growth: 67% expect growth in next 3 years
- Profitability Focus: 91% of MSPs prioritize profitability

DATA SOURCES:
${Object.values(appData.data_sources).map(source => `- ${source.name} (${source.update_frequency})`).join('\n')}

2025 MARKET TRENDS:
- 91% of MSPs prioritize profitability in 2025
- 64% reported revenue increases in 2024
- 67% expect growth over next 3 years
- 2/3 experienced increase in AI-driven attacks
- 90% view automation as game-changing technology

This report is generated from aggregated industry data and should be used for benchmarking purposes only.
        `;
        
        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `msp-pricing-report-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating report:', error);
    }
}

// Utility functions
function formatTitle(str) {
    return str.replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase())
              .replace(/Msps/g, 'MSPs')
              .replace(/Aisp/g, 'AISP');
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (trendsChart) {
        trendsChart.destroy();
    }
});